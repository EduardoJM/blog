import fs from 'fs';

export type Tag = {
  slug: string;
  display: string;
}

const getAllTags = () => {
  const data = fs.readFileSync('blog/_categories.json');
  const dataText = data.toString();
  return JSON.parse(dataText) as Array<Tag>;
}

export const tags = getAllTags();
