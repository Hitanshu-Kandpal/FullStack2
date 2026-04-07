const BASE_URL = 'http://localhost:8080/api/students';

export const getAllStudents = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  return await response.json();
};

export const getStudentById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch student');
  }
  return await response.json();
};

export const addStudent = async (student) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...student,
      id: parseInt(student.id)
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to add student');
  }
  return await response.json();
};

export const updateStudent = async (id, student) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...student,
      id: parseInt(student.id)
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to update student');
  }
  return await response.json();
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete student');
  }
  return await response.text();
};