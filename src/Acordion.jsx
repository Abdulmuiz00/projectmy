import React, { useState } from 'react';
function AccordionItem({ id, title, content, isOpen, onToggle }) {
  return (
    <div
      style={{
        borderBottom: '1px solid #ddd',
        padding: '12px 0',
      }}
    >
      <button
        onClick={() => onToggle(id)}
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          padding: '0',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        aria-expanded={isOpen}
      >
        {title}
        <span style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▶</span>
      </button>
      {isOpen && (
        <div
          style={{
            marginTop: 8,
            color: '#555',
            lineHeight: 1.5,
            transition: 'max-height 0.2s ease',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default function FAQAccordion() {
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqs = [
    {
      id: 1,
      title: 'What is React?',
      content:
        'React is a JavaScript library for building user interfaces. It allows you to create reusable UI components.',
    },
    {
      id: 2,
      title: 'What is a controlled component?',
      content:
        'A controlled component is a component where React controls the state of form inputs or interactive UI behavior.',
    },
    {
      id: 3,
      title: 'How does this FAQ accordion work?',
      content:
        'It uses a controlled open state, meaning only one FAQ item is open at a time and is managed by React state.',
    },
  ];

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '50px auto',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>FAQ Accordion (Controlled)</h2>
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          id={faq.id}
          title={faq.title}
          content={faq.content}
          isOpen={openId === faq.id}
          onToggle={toggleItem}
        />
      ))}
    </div>
  );
}

