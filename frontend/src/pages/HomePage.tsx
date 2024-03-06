import InputForm from '../components/InputForm';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl mb-4">Add new sleep entry</h1>
      <InputForm />
    </div>
  );
};
export default HomePage;
