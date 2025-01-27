import EditSchoolForm from '@/components/EditSchoolForm';

export default function EditSchoolPage({ params }: { params: { id: string } }) {
  return <EditSchoolForm id={params.id} />;
}

export async function generateStaticParams() {
  // In a real application, you would fetch the list of school IDs from an API
  // For this example, we'll return a static list
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}