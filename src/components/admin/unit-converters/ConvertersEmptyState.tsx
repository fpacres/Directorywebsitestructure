import { Calculator } from '@phosphor-icons/react';
import { AdminEmptyState } from '../shared/AdminEmptyState';

interface ConvertersEmptyStateProps {
  hasSearchQuery: boolean;
}

export function ConvertersEmptyState({ hasSearchQuery }: ConvertersEmptyStateProps) {
  return (
    <AdminEmptyState
      icon={Calculator}
      title="No converters found"
      description="Get started by creating your first converter"
      searchDescription="Try a different search term"
      buttonText="Add New Converter"
      buttonHref="/admin/unit-converters/new"
      hasSearchQuery={hasSearchQuery}
    />
  );
}