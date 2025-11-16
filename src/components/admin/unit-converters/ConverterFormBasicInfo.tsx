import { FormInput } from '../form/FormInput';
import { FormTextarea } from '../form/FormTextarea';
import { FormSelect } from '../form/FormSelect';
import { ConverterFormData } from '../../../types/converter';

interface ConverterFormBasicInfoProps {
  formData: ConverterFormData;
  setFormData: (data: ConverterFormData) => void;
}

const unitOptions = [
  { value: 'Inch', label: 'Inch' },
  { value: 'Foot', label: 'Foot' },
  { value: 'Yard', label: 'Yard' },
  { value: 'Mile', label: 'Mile' },
  { value: 'Meter', label: 'Meter' },
  { value: 'Centimeter', label: 'Centimeter' },
  { value: 'Kilometer', label: 'Kilometer' },
  { value: 'Millimeter', label: 'Millimeter' },
];

export function ConverterFormBasicInfo({ formData, setFormData }: ConverterFormBasicInfoProps) {
  const handleTitleChange = (value: string) => {
    const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    setFormData({ ...formData, title: value, slug });
  };

  return (
    <div
      className="p-6 rounded-[var(--radius-card)]"
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      <h3 style={{ color: 'var(--foreground)', marginBottom: '24px' }}>
        Basic Information
      </h3>

      <div className="flex flex-col gap-6">
        <FormInput
          label="Converter Title"
          value={formData.title}
          onChange={handleTitleChange}
          placeholder="e.g., Length Unit Converter"
          required
        />

        <FormInput
          label="Slug"
          value={formData.slug}
          onChange={(value) => setFormData({ ...formData, slug: value })}
          placeholder="e.g., length-converter"
          required
          helperText="Auto-generated from title, but you can customize it"
        />

        <FormTextarea
          label="Excerpt"
          value={formData.excerpt}
          onChange={(value) => {
            if (value.length <= 160) {
              setFormData({ ...formData, excerpt: value });
            }
          }}
          placeholder="Brief summary of the converter (max 160 characters)"
          rows={2}
          helperText={`${formData.excerpt.length}/160 characters`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            label="From Unit"
            value={formData.default_from_unit}
            onChange={(value) => setFormData({ ...formData, default_from_unit: value })}
            options={unitOptions}
            placeholder="Select unit"
            required
          />

          <FormSelect
            label="To Unit"
            value={formData.default_to_unit}
            onChange={(value) => setFormData({ ...formData, default_to_unit: value })}
            options={unitOptions}
            placeholder="Select unit"
            required
          />
        </div>

        <FormTextarea
          label="Description"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          placeholder="Describe what this converter does and when to use it..."
          rows={4}
          richEditor={true}
        />
      </div>
    </div>
  );
}