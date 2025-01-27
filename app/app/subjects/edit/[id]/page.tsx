import EditSubjectForm from '@/components/EditSubjectForm';

export default function EditSubjectPage({ params }: { params: { id: string } }) {
  return <EditSubjectForm id={params.id} />;
}

export async function generateStaticParams() {
  // In a real application, you would fetch the list of subject IDs from an API
  // For this example, we'll return a static list
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}