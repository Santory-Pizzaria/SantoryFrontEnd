<template>

  <head>
    <link rel="icon" href="/logo.ico">
    <link rel="shortcut icon" type="image/x-icon" href="/logo.ico">
  </head>

  <footer class="rodape">
            <div class="container-3">
                <div class="row">
                    <div class="col" id="company">
                        
                        <p id="rea">
                            <img src="@/assets/imagens/logo.png" alt="Santory Pizzaria" class="logo" />
                        </p>
                        <div class="social">
                            <a href="#"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                        </div>
            <p id="copy">
              © ALLRIGHT RESERVED <br />
              PIZZARIA SANTORY
            </p>
                    </div>
                    <div class="col" id="services">
                        <h3>Páginas</h3>
                        <div class="links">
                            <a href="#">Voltar ao início</a>
                            <a href="nacional.html">Nacional</a>
                            <a href="noticia-destaque.html">Notícia destaque</a>
                            <a href="#">Newslatter</a>
                        </div>
                    </div>
                    <div class="col" id="useful-links">
                        <h3>Suporte</h3>
                        <div class="links">
                            <a href="cadastro.html">cadastre-se</a>
                            <a href="login.html">Login</a>
                            <a href="#">Perguntas frequentes</a>
                            <a href="#">Suporte</a>
                        </div>
                    </div>
                    <div class="col" id="contact">
                        <h3>Contato</h3>
                       <p id="text-footer">Há mais de vinte anos o sevindo as melhores <br /> pizzas da cidade em um lugar agradável e acolhedor, <br /> pra você se sentir em casa. <br /> As pizzas, entradas e saladas são cuidadosamente <br /> preparadas com ingredientes de alta qualidade e <br /> atendem os mais variados públicos: tradicional, vegano <br /> ou sem glúten.</p>
                    </div>
                </div>
            </div>
        </footer>
</template>

<style scoped>
footer {
  background-color: rgb(1, 42, 1);
  position: relative;
  overflow-y: hidden;
  display: grid 'footer';
  margin-top: 5vh;
  min-height:250px;
  padding: 3rem 1rem;
  grid-row-end: auto;
  border-top: 3px solid #000;
}

.container-3 {
  max-width: 1299px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#text-footer {
  font-size: 16px;
}

.col {
  min-width: 250px;
  color:#ffffff;
  font-family: poppins;
  padding:0 2rem;
}

.col .logo {
  width: 100px;
  margin-top: 5vh;
}

.col h3 {
  font-size: 30px;
  color:#fff1c5;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
}

.col h3::after {
  content: '';
  height:3px;
  width:0px;
  background-color: #fff1c5;
  position: absolute;
  bottom: 0;
  left:0;
  transition: 0.3s ease;

}

.col h3:hover::after {
  width:30px
}

.col .social a i {
  color:#ffffff;
  margin-right: 5px;
  transition: 0.3s ease;
}

.col a {
  font-size: 16px;
}

.col .social a i:hover {
  transform: scale(1.3);
  color: #d2780d;
}

.col .links a {
  display: block;
  text-decoration: none;
  color:#ffffff;
  margin-bottom: 5px;
  position: relative;
  transition: 0.3s ease;
}

.col .links a::before {
  content:'';
  height: 16px;
  width:3px;
  position: absolute;
  top:5px;
  left:-10px;
  background-color: #d2780d;
  transition: 0.5s ease;
  opacity: 0;
}

.col .links a:hover::before {
  opacity: 1;
}

.col .links a:hover {
  transform: translateX(-8px);
  color:#d2780d;
}

.col .contact-details {
  display: inline-flex;
  justify-content: space-between;
}

.col .contact-details i {
  margin-right:15px;
}

.row .form{
  display: flex;
  justify-content: center;
  align-items: center;
  padding:2rem 0;
}

.row .form input {
  background-color: #1a1c20ff;
  border:0;
  outline:none;
  padding:14px 20px;
  border-radius: 6px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.col#contact {
  margin-top: -2%;
}

.col#useful-links {
  margin-top: -6%;
}

.col#services {
  margin-top: -6%;
}

.form button {
  padding:14px 20px;
  border:0;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: #000;
}

i .fa-paper-plane {
  transition: transform .3s ease;
}

p#copy {
  margin-top: 3vh;
  font-size: 12px;
}

p#rea {
  margin-top: -5vh;
}

.i fa-paper-plane:hover {
  transform: scale(1.1);
}
@media (max-width:1299px)
{
.row{
  flex-direction: column;
}

.col{
  width: 100%;
  text-align: left;
  margin-bottom: 25px;
}
}

@media (max-width:768px)
{
.row {
  flex-direction: column;
}

.col {
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
}
}
</style>
