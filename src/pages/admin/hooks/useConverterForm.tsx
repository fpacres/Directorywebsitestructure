import { useState, useEffect } from 'react';
import { toast } from 'sonner@2.0.3';
import { navigate } from '../../../shared/utils/navigation';
import { projectId, publicAnonKey } from '../../../utils/supabase/info.tsx';
import { useAuth } from '../../../contexts/AuthContext';
import { ConverterFormData } from '../../../types/converter';

export function useConverterForm() {
  const { session } = useAuth();
  const [formData, setFormData] = useState<ConverterFormData>({
    title: '',
    slug: '',
    category: 'Digital Tools',
    subcategory: 'length-unit-converter',
    subcategory_display_name: 'Length Unit Converter',
    default_from_unit: '',
    default_to_unit: '',
    excerpt: '',
    description: '',
    meta_title: '',
    meta_description: '',
    published: true,
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const editMatch = path.match(/\/admin\/unit-converters\/edit\/(.+)/);
    
    if (editMatch) {
      setIsEditMode(true);
      setPageId(editMatch[1]);
      fetchPageData(editMatch[1]);
    }
  }, []);

  const fetchPageData = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/pages/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch page data');
      }

      const data = await response.json();
      
      // Parse content field back into form fields for editing
      let parsedDescription = data.page.description || '';
      let parsedFaqs = data.page.faqs || [];
      
      if (data.page.content) {
        try {
          const contentData = JSON.parse(data.page.content);
          
          // Extract description from descriptionSections
          if (contentData.descriptionSections && contentData.descriptionSections.length > 0) {
            const firstSection = contentData.descriptionSections[0];
            parsedDescription = firstSection.paragraphs ? firstSection.paragraphs.join('\n\n') : '';
          }
          
          // Extract FAQs from faqSections
          if (contentData.faqSections && contentData.faqSections.length > 0) {
            parsedFaqs = contentData.faqSections.map((faq: any, index: number) => ({
              id: `faq-${Date.now()}-${index}`,
              question: faq.question || '',
              answer: faq.answer || '',
            }));
          }
        } catch (error) {
          console.error('Error parsing content field:', error);
        }
      }
      
      setFormData({
        ...data.page,
        description: parsedDescription,
        faqs: parsedFaqs,
      });
    } catch (error) {
      console.error('Error fetching page:', error);
      toast.error('Failed to load page data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (publishStatus: boolean) => {
    if (!formData.title || !formData.slug) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!session?.access_token) {
      toast.error('You must be logged in to perform this action');
      return;
    }

    try {
      setLoading(true);
      
      const url = isEditMode && pageId
        ? `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/pages/${pageId}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/pages`;
      
      const method = isEditMode ? 'PUT' : 'POST';

      // Transform data for the frontend
      // Create content field with descriptionSections and faqSections
      const descriptionSections = formData.description 
        ? [{ title: 'Description', paragraphs: [formData.description] }]
        : [];
      
      const faqSections = (formData.faqs || []).map(faq => ({
        question: faq.question,
        answer: faq.answer,
      }));

      const content = JSON.stringify({
        descriptionSections,
        faqSections,
      });

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData, 
          published: publishStatus,
          content, // Add the properly formatted content field
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} page`);
      }

      const actionText = publishStatus ? 'published' : 'saved as draft';
      toast.success(`Converter ${actionText} successfully`);
      navigate('/admin/unit-converters');
    } catch (error) {
      console.error('Error saving page:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} converter`);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = () => handleSubmit(true);
  const handleSaveDraft = () => handleSubmit(false);

  const handleDelete = async () => {
    if (!pageId || !session?.access_token) {
      toast.error('Cannot delete: invalid page or not logged in');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d38bd56f/pages/${pageId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete page');
      }

      toast.success('Converter deleted successfully');
      navigate('/admin/unit-converters');
    } catch (error) {
      console.error('Error deleting page:', error);
      toast.error('Failed to delete converter');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    isEditMode,
    handlePublish,
    handleSaveDraft,
    handleDelete,
  };
}