import EditCourseForm from '@/components/EditCourseForm';

export default function EditCoursePage({ params }: { params: { id: string } }) {
  return <EditCourseForm id={params.id} />;
}

export async function generateStaticParams() {
  // In a real application, you would fetch the list of course IDs from an API
  // For this example, we'll return a static list
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}