import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import VoiceflowWidget from "./VoiceflowWidget";

function FAQ() {
  const faqs = [
    {
      question: "¿Cómo puedo realizar un pedido?",
      answer:
        "Para realizar un pedido, selecciona los productos que deseas, añádelos al carrito y completa el proceso de pago.",
    },
    {
      question: "¿Puedo devolver un producto?",
      answer:
        "Sí, puedes devolver los productos que estén en estado 'PENDIENTE' o según nuestra política de devoluciones en un plazo determinado.",
    },
    {
      question: "¿Cuál es el tiempo de entrega?",
      answer:
        "El tiempo de entrega depende de tu ubicación, pero generalmente los pedidos se entregan entre 2 y 5 días hábiles.",
    },
    {
      question: "¿Cómo contacto con soporte?",
      answer:
        "Puedes utilizar nuestro formulario de contacto o enviarnos un correo a info@crearte.com.",
    },
  ];

  return (
    <div  style={{ backgroundColor: "#FFFDF6" }}>
        <header>
            <Header></Header>
        </header>
        <div className="container my-5 d-flex flex-column min-vh-100"  >
      <h2 className="mb-4 text-center">Preguntas Frecuentes</h2>
      <div className="accordion" id="faqAccordion" >
        {faqs.map((faq, index) => (
          <div className="accordion-item"   key={index}>
            <h2 className="accordion-header"  id={`heading${index}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`} 
                style={{ backgroundColor: "#F5EDE0" }}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <VoiceflowWidget />
    <footer>
        <Footer></Footer>
    </footer>
    
    </div>
  );
}

export default FAQ;
