<script lang="ts">
  import screenPlaceholderImg from "$lib/images/success.png";
  //import {YOUTUBE_API_KEY} from '$env/static/private';

  import Modal from "$lib/components/Modal.svelte";
  import Youtube from "svelte-youtube-embed";

  import { tomcruise } from "$lib/dummy-data";

  let TUBE_API_KEY = "AIzaSyCSis_YjZDjyGgNvXSZPaYiZ-3oZ165SNo";
  let term = "";
  let selection = "";

  let s = ["25", "15", "10", "5"];
  let max_result = s[0];

  let response;
  let data: any;
  let showModal = false;
  let showMapModal = false;
  let summary = false;
  let idVid: string;
  let trans_example = "";
  let asideLabel = "";

  const dummyText = tomcruise;
  $: str = dummyText.split("");

  function typer() {
    const interval = setInterval(() => {
      trans_example += str[0];
      str = str.slice(1);

      if (!str.length) {
        clearInterval(interval);
      }
    }, 100);
  }

  function resolveAfter20Seconds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(trans_example);
      }, 7000);
    });
  }

  async function asyncCall() {
    asideLabel = "Getting summary...";
    await resolveAfter20Seconds();
    asideLabel = "Summary";
    typer();
  }

  const handleVideoLaunch = (v: string) => {
    idVid = v;
    asyncCall();
    showMapModal = false;
    showModal = true;
  };
  const handleMapLaunch = () => {
    showMapModal = true;
    showModal = true;
  };

  const getData = async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${term}&type=video&key=${TUBE_API_KEY}&maxResults=${max_result}&order=date`
    );
    response = await res.json();
    console.log(response);
    data = response;
    selection = term;
    term = "";
  };
</script>

<div class="">
  <div class="py-8 flex flex-col justify-center items-center rounded-md">
    <!-- <div class="capitalize font-bold text-5xl text-center">{term || 'YouTube API'}</div> -->
    <!-- svelte-ignore a11y-invalid-attribute -->
    {#if term}
      <div class="animate-bounce ml-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-down"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
          />
        </svg>
      </div>
    {/if}
    <!-- svelte-ignore a11y-invalid-attribute -->
    <h2 class="font-normal text-lg text-center flex-wrap mr-12">
      Search for <a
        href="#"
        style="pointer-events:{term.length > 3 ? 'all' : 'none'}"
        on:click={getData}
        class="text-orange-700 mr-8 text-xl md:text-2xl font-semibold pl-1 pt-0.5 {term &&
          'absolute z-10 animate-pulse'}">{term || "Unknown"}</a
      >
      {#if term}
        <span
          class="relative animate-ping opacity-80 inline-flex md:ml-10 rounded-full h-6 w-20 bg-orange-300"
        />{/if}
    </h2>
    <form
      class="flex items-center space-x-2 border-2 border-slate-200 rounded-full p-2 mt-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-gray-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        class="w-full outline-none placeholder-gray-400 text-gray-800"
        type="text"
        maxlength={25}
        placeholder="Search (max. 25 characters)"
        bind:value={term}
      />
    </form>
    {#if data && term.length < 1}
      <div>
        <p class="text-slate-400 text-sm mt-2">
          Showing {max_result} random videos for {" "}
          <span class="font-semibold text-lg">"{selection}"</span>
        </p>
      </div>
    {/if}
    {#if term || term.length > 0}
      <div class="p-2">
        <span class="text-sm text-slate-600"
          >Show{" "}
          <select
            aria-selected="true"
            class="ml-2 mr-2"
            bind:value={max_result}
            on:change={() => console.log(max_result)}
          >
            {#each s as r_size}
              <option value={r_size}>{r_size}</option>
            {/each}
          </select>
          results
        </span>
      </div>
    {/if}
  </div>
</div>

<Modal bind:showModal>
  <!-- <h2 slot="header">Video of selection</h2> -->
  <div class="grid grid-cols-1 h-full w-full md:grid-cols-3 md:h-full gap-3">
    {#if !showMapModal}
      <aside
        class="bg-orange-400 h-64 w-full rounded-md items-center justify-center md:h-full overflow-y-auto"
      >
        <!-- <button
          on:click={() => (summary = !summary)}
          class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Show summary</button> -->
        <!-- svelte-ignore a11y-interactive-supports-focus -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button
          on:click={() => (summary = !summary)}
          class="animate-bounce w-6 h-6 md:w-8 md:h-8">🤖</button
        >
        {#if summary}
          <div
            class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto"
          >
            {#if trans_example === ""}
              <h2 class="text-slate-600 text-lg font-semibold mt-1">
                {asideLabel}
              </h2>
              <div class="animate-pulse flex space-x-4">
                <!-- <div class="rounded-full bg-slate-700 h-10 w-10" /> -->
                <div class="flex-1 space-y-6 py-1">
                  <div class="h-2 bg-slate-600 rounded" />
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-2 bg-slate-600 rounded col-span-2" />
                      <div class="h-2 bg-slate-600 rounded col-span-1" />
                    </div>
                    <div class="h-2 bg-slate-600 rounded" />
                  </div>
                </div>
              </div>
            {:else}
              <div class="flex flex-col items-center justify-center p-8">
                <h2 class="text-slate-600 text-lg font-semibold mt-1">
                  {asideLabel}
                </h2>

                <p>
                  {trans_example}
                </p>
              </div>
            {/if}
          </div>
        {/if}
      </aside>
      <div class="md:col-span-2 md:w-full h-full rounded-md bg-slate-400">
        <Youtube id={idVid} altThumb={true} />
      </div>
    {:else}
      <aside
        class="bg-orange-300 h-52 w-full rounded-md items-center justify-center md:h-full overflow-y-auto"
      >
        <button>Video metadata</button>
      </aside>
      <div class="md:col-span-2 md:w-full h-64 w-full rounded-md bg-orange-600">
        TomTom Map
      </div>
    {/if}
  </div>
</Modal>

{#if data}
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-4"
    role="button"
  >
    {#each data.items as item}
      <!-- <a
				href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
				target="_blank"
				rel="noreferrer"
			> -->
      <!-- svelte-ignore a11y-invalid-attribute -->

      <div class="w-full h-full transition-all group duration-200 rounded-lg">
        <div
          class="overflow-hidden shadow-md hover:shadow-lg relative rounded-md h-full flex-col flex justify-center"
        >
          <button class="z-30" on:click={handleMapLaunch}>
            <span class="relative flex w-6 h-6">
              <span
                class="animate-ping absolute bottom-0 right-0 inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"
              />
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                class="relative inline-flex bg-orange-500 w-6 h-6 rounded-full"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </span>
          </button>
          <a href="#" on:click={() => handleVideoLaunch(item.id.videoId)}>
            <img
              src={item.snippet.thumbnails.high.url}
              alt=""
              class="group-hover:scale-105 group-hover:blur-sm object-cover group-hover:opacity-80 transition-all duration-200"
            />
            <div
              class="absolute top-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
            >
              <div class="text-lg">{item.snippet.description}</div>
            </div>
            <div class="h-full p-4">
              <div class="neutral-500 rounded-md font-bold">
                {item.snippet.channelTitle}
              </div>
              <div class="">{item.snippet.title}</div>
            </div>
          </a>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div class="flex items-center justify-center pt-4">
    <img src={screenPlaceholderImg} alt="2 people dancing" class="w-64 h-64" />
  </div>
{/if}
