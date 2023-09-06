import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <div>
        <footer>
        <section>
            {/* <a href="#title">Ir al comienzo</a> */}
            <a href="mailto:tuestacionamiento@gmail.com">Contáctanos</a>
            <a href="https://github.com/ulisesfestin/EstacionamientoYA" target="_blank">Nuestro repositorio</a>
        </section>
        <p>Copyright 2023 - Ulises Festín | Pablo Balastegui</p>
      </footer>
    </div>
  );
}
