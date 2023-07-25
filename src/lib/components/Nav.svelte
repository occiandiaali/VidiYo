<!-- <div class="p-2 xl:p-4 border shadow-md">
    <div class="flex justify-between max-w-5xl mx-auto px-2">
        <nav>
            <a href="/">
                <h1 class="font-semibold">VidiYo!</h1>
            </a>
        </nav>
    </div>
</div> -->

<script lang="ts">
  import { searchTerm } from "../../InputStore";
  let showMenu = false;
  function toggleNavbar() {
    showMenu = !showMenu;
  }
  let term = "";
  searchTerm.set(term);
</script>

<div>
  <div>
    <nav
      class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center"
    >
      <div class="flex items-center justify-between">
        <a
          href="/"
          class="text-xl font-semibold text-slate-700 md:text-2xl hover:text-slate-900"
        >
          VidiYo!
        </a>
        <!-- Mobile menu button -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          on:click={toggleNavbar}
          on:keydown|preventDefault={toggleNavbar}
          class="flex md:hidden"
        >
          <button
            type="button"
            class="text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-400"
          >
            {#if !showMenu}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 53.7 53.7"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8"
              >
                <path
                  opacity=".6"
                  fill="%23666E6E"
                  d="M35.6 34.4L28 26.8l7.6-7.6c.2-.2.2-.5 0-.7l-.5-.5c-.2-.2-.5-.2-.7 0l-7.6 7.6-7.5-7.6c-.2-.2-.5-.2-.7 0l-.6.6c-.2.2-.2.5 0 .7l7.6 7.6-7.6 7.5c-.2.2-.2.5 0 .7l.5.5c.2.2.5.2.7 0l7.6-7.6 7.6 7.6c.2.2.5.2.7 0l.5-.5c.2-.2.2-.5 0-.7z"
                />
              </svg>
            {/if}
          </button>
        </div>
      </div>
      <!-- Menu open: "block", Menu closed: "hidden"-->
      <div
        class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 {showMenu
          ? 'flex'
          : 'hidden'}"
      >
        <a class="text-gray-800 hover:text-blue-400" href="/about">About</a>
        <a class="text-gray-800 hover:text-blue-400" href="/favourites"
          >Favourites</a
        >
        <a class="text-gray-800 hover:text-blue-400" href="/">SignOut</a>
      </div>
    </nav>
  </div>
</div>
