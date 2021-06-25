<template>
     <nav class="navbar navbar-expand-lg navbar-light bg-light my-5">
    <div class="container-fluid">
      <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
      aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <router-link to="/" class="nav-link ">首頁</router-link>
        </div>
          <div class="navbar-nav">
            <router-link to="/products" class="nav-link">產品頁面</router-link>
      </div>
          <div class="navbar-nav">
            <router-link to="/cart" class="nav-link">購物車頁面</router-link>
          </div>
            <div class="navbar-nav">
            <router-link to="/login" class="nav-link">登入後台</router-link>
          </div>
      </div>
    </div>
    </div>
    </nav>
</template>
