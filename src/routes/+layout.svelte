<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
    import "../app.css";
    

</script>

<div>
    <Nav />
    <main class="max-w-7xl px-2 mx-auto min-h-screen py-10">
        <slot />
    </main>
</div>