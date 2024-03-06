import { ChangeEvent, FormEvent, useState } from 'react';
import type { Genders, FormErrors } from '../types';

const genders: Genders[] = ['Male', 'Female', 'Other'];

const apiUrl = import.meta.env.VITE_API_URL;

const InputForm = () => {
  /*
    I know this is expensive when filling up the form, because react is re-rendering the component every time
    if an input field is changed
    Since the app is small I think it's not a big performance issue.
    Alternatively
      - I could use just use uncontrolled inputs with refs, or
      - some 3rd party library to optimise
  */
  const [formData, setFormData] = useState({
    name: '',
    gender: genders[0],
    duration: 8,
    errors: {} as FormErrors,
    loading: false,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // some basic validaion
  const validateForm = () => {
    const errors: FormErrors = {};

    // Check if username is empty
    if (!formData.name) {
      errors.name = 'Name is required';
    }

    // Check if duration is valid
    if (!formData.duration) {
      errors.duration = 'Duration is required';
    }
    if (
      formData.duration &&
      (formData.duration < 0 || formData.duration > 24)
    ) {
      errors.duration = 'Duration must between 0 and 24 hours';
    }

    setFormData((prevState) => ({ ...prevState, errors }));

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    setFormData({
      ...formData,
      loading: true,
    });

    if (validateForm()) {
      // Form is valid, submit data
      const { name, gender, duration } = formData;

      try {
        await fetch(`${apiUrl}/api/sleeps`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, gender, duration }),
        });

        // reset form if all good
        setFormData({
          name: '',
          gender: genders[0],
          duration: 8,
          errors: {},
          loading: false,
        });
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error
            ? error.message
            : 'Something unexpected happened. Please Try again later'
        );
        setFormData({
          ...formData,
          loading: false,
        });
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-4 border rounded-lg w-full md:w-2/3 xl:w-1/2 p-8"
      onSubmit={handleSubmit}
    >
      <div>
        <label>
          Name:
          <br />
          <input
            className="w-full"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          {formData.errors.name && (
            <p className="text-red-500">{formData.errors.name}</p>
          )}
        </label>
      </div>
      <div>
        <label>
          Gender:
          <br />
          <select
            className="w-full"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Duration:
          <br />
          <input
            className="w-full"
            type="number"
            name="duration"
            min={0}
            max={24}
            required
            value={formData.duration}
            onChange={handleChange}
          />
          {formData.errors.duration && (
            <p className="text-red-500">{formData.errors.duration}</p>
          )}
        </label>
      </div>
      <div>
        <button
          className="bg-green-400 rounded-md px-4 py-2 text-white"
          type="submit"
          disabled={formData.loading}
        >
          Submit
        </button>
        {formData.loading && (
          <div className="mt-3 font-bold animate-pulse">Loading...</div>
        )}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </form>
  );
};
export default InputForm;
