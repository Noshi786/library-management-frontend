import React, { useState } from 'react';

export default function AddItemForm({ onAddItem }) {
  const [type, setType] = useState('Book');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [fileSizeMB, setFileSizeMB] = useState(5);
  const [format, setFormat] = useState('PDF');
  const [issueNumber, setIssueNumber] = useState(1);
  const [publisher, setPublisher] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddItem({
      type,
      title,
      year: Number(year),
      author,
      genre,
      fileSizeMB: Number(fileSizeMB),
      format,
      issueNumber: Number(issueNumber),
      publisher,
      durationMinutes: Number(durationMinutes)
    });

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-title"><span className="eyebrow">Expand the collection</span><h2>Add a title</h2></div>
      <div className="form-fields">
        <label className="field type-field"><span>Format</span><select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Book">Book</option>
          <option value="EBook">EBook</option>
          <option value="Magazine">Magazine</option>
          <option value="AudioBook">AudioBook</option>
        </select></label>
        <label className="field"><span>Title</span><input type="text" placeholder="e.g. The Creative Act" value={title} onChange={(e) => setTitle(e.target.value)} required /></label>
        <label className="field year-field"><span>Year</span><input type="number" placeholder="2026" value={year} onChange={(e) => setYear(e.target.value)} required /></label>
      </div>

      {(type === 'Book' || type === 'EBook') && (
        <div className="form-fields extra-fields">
          <label className="field"><span>Author</span><input type="text" placeholder="Who wrote it?" value={author} onChange={(e) => setAuthor(e.target.value)} /></label>
          <label className="field"><span>Genre</span><input type="text" placeholder="What shelf?" value={genre} onChange={(e) => setGenre(e.target.value)} /></label>
        </div>
      )}

      {type === 'AudioBook' && (
        <div className="form-fields extra-fields">
          <label className="field"><span>Narrator / author</span><input type="text" placeholder="Who reads it?" value={author} onChange={(e) => setAuthor(e.target.value)} /></label>
          <label className="field"><span>Duration (minutes)</span><input type="number" min="1" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} /></label>
        </div>
      )}

      {type === 'EBook' && (
        <div className="form-fields extra-fields">
          <label className="field"><span>File size (MB)</span><input type="number" placeholder="5" value={fileSizeMB} onChange={(e) => setFileSizeMB(e.target.value)} /></label>
          <label className="field"><span>File format</span><input type="text" placeholder="PDF" value={format} onChange={(e) => setFormat(e.target.value)} /></label>
        </div>
      )}

      {type === 'Magazine' && (
        <div className="form-fields extra-fields">
          <label className="field"><span>Issue number</span><input type="number" placeholder="1" value={issueNumber} onChange={(e) => setIssueNumber(e.target.value)} /></label>
          <label className="field"><span>Publisher</span><input type="text" placeholder="Publisher name" value={publisher} onChange={(e) => setPublisher(e.target.value)} /></label>
        </div>
      )}

      <button type="submit" className="add-button"><span>+</span> Add to catalogue</button>
    </form>
  );
}