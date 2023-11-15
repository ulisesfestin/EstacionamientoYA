import React from 'react'

export const Carousel = () => {
  return (
    <div>
      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={require(`../imagenes/Parking.jpg`)} class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src={require(`../imagenes/parking3.jpeg`)} class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src={require(`../imagenes/parking-garage.jpg`)} class="d-block w-100" alt="..."/>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}
