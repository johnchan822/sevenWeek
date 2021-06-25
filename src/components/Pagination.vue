<template>
<div class="container d-flex justify-content-center mt-5">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{'disabled':!page.has_pre}">
            <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="$emit('emit-page',page.current_page -1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="(item) in page.total_pages"
          :key="item"
          :class="{'active':item === page.current_page}">
            <a class="page-link" href="#" @click.prevent="$emit('emit-page',item)">{{ item }}</a>
            </li>
          <li class="page-item"  :class="{'disabled':!page.has_next}">
          <a class="page-link" href="#" aria-label="Next"
            @click.prevent="$emit('emit-page',page.current_page +1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
        </nav>
    </div>
</template>

<script>
export default {
  props: ['page'],
};
</script>
