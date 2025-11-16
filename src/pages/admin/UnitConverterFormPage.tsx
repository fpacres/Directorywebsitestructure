import { AdminLayout } from '../../components/admin/AdminLayout';
import { ConverterFormHeader } from '../../components/admin/unit-converters/ConverterFormHeader';
import { ConverterFormBasicInfo } from '../../components/admin/unit-converters/ConverterFormBasicInfo';
import { ConverterFormSEO } from '../../components/admin/unit-converters/ConverterFormSEO';
import { ConverterFormFAQ } from '../../components/admin/unit-converters/ConverterFormFAQ';
import { AdminFormSkeleton } from '../../components/skeletons/AdminFormSkeleton';
import { useConverterForm } from './hooks/useConverterForm';

export default function UnitConverterFormPage() {
  const { formData, setFormData, loading, isEditMode, handlePublish, handleSaveDraft, handleDelete } = useConverterForm();

  // Show skeleton when initially loading in edit mode (fetching data)
  if (loading && isEditMode && !formData.title) {
    return (
      <AdminLayout>
        <AdminFormSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 mx-auto relative" style={{ maxWidth: '1200px' }}>
        {/* Loading overlay when submitting (data is already loaded) */}
        {loading && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{ 
                borderColor: 'var(--border)',
                borderTopColor: 'var(--primary)'
              }} />
              <p style={{ color: 'var(--foreground)' }}>Saving changes...</p>
            </div>
          </div>
        )}
        
        <ConverterFormHeader
          isEditMode={isEditMode}
          onPublish={handlePublish}
          onSaveDraft={handleSaveDraft}
          onDelete={handleDelete}
          loading={loading}
          slug={formData.slug}
          published={formData.published}
        />
        
        <div className="flex flex-col gap-6">
          <ConverterFormBasicInfo
            formData={formData}
            setFormData={setFormData}
          />
          
          <ConverterFormSEO
            formData={formData}
            setFormData={setFormData}
          />
          
          <ConverterFormFAQ
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </AdminLayout>
  );
}