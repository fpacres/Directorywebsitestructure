import { FormInput } from '../form/FormInput';
import { FormTextarea } from '../form/FormTextarea';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { ConverterFormData } from '../../../types/converter';

interface ConverterFormSEOProps {
  formData: ConverterFormData;
  setFormData: (data: ConverterFormData) => void;
}

export function ConverterFormSEO({ formData, setFormData }: ConverterFormSEOProps) {
  return (
    <div
      className="rounded-[var(--radius-card)]"
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="seo" style={{ borderColor: 'var(--border)' }}>
          <AccordionTrigger className="px-6" style={{ color: 'var(--foreground)' }}>
            <h3>SEO Settings</h3>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <div className="flex flex-col gap-6">
              <FormInput
                label="Meta Title"
                value={formData.meta_title}
                onChange={(value) => setFormData({ ...formData, meta_title: value })}
                placeholder="e.g., Length Unit Converter - Free Online Conversion Tool"
                helperText={`${formData.meta_title.length}/60 characters recommended`}
              />

              <FormTextarea
                label="Meta Description"
                value={formData.meta_description}
                onChange={(value) => setFormData({ ...formData, meta_description: value })}
                placeholder="A brief description for search engines..."
                rows={3}
                helperText={`${formData.meta_description.length}/160 characters recommended`}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}