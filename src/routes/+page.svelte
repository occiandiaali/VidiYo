<script lang="ts">
  import screenPlaceholderImg from "$lib/images/success.png";
  //import {YOUTUBE_API_KEY} from '$env/static/private';

  import Modal from "$lib/components/Modal.svelte";
  import Youtube from "svelte-youtube-embed";
  // import { YoutubeTranscript } from "youtube-transcript";

  import { tomcruise } from "$lib/dummy-data";

  let TUBE_API_KEY = "AIzaSyCSis_YjZDjyGgNvXSZPaYiZ-3oZ165SNo";
  let term = "";
  let selection = "";

  let s = ["25", "15", "10", "5"];
  let max_result = s[0];

  let response;
  let data: any;
  let showModal = false;
  let idVid: string;
  let trans_example = "";
  let asideLabel = "";
  // const dummyText = `
  //       So, async ensures that the function returns a promise, and wraps non-promises in it. Simple enough, right? But not only that. There’s another keyword, await, that works only inside async functions, and it’s pretty cool.
  //       `;
  const dummyText = tomcruise;
  $: str = dummyText.split("");

  function typer() {
    const interval = setInterval(() => {
      //  document.write(str[0]);
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
    showModal = true;
    idVid = v;
    asyncCall();
  };

  const options = {
    width: "390",
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
    {#if data}
      <div>
        <p class="text-slate-400 text-sm mt-2">
          Showing {max_result} random videos for {" "}
          <span class="font-semibold text-lg">"{selection}"</span>
        </p>
      </div>
    {/if}
    {#if term && !data}
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
    <aside
      class="bg-orange-400 h-64 w-full rounded-md items-center justify-center md:h-full overflow-y-auto"
    >
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
    </aside>
    <div class="md:col-span-2 md:w-full h-full rounded-md">
      <Youtube id={idVid} altThumb={true} />
    </div>
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
      <a href="#" on:click={() => handleVideoLaunch(item.id.videoId)}>
        <div class="w-full h-full transition-all group duration-200 rounded-lg">
          <div
            class="overflow-hidden shadow-md hover:shadow-lg relative rounded-md h-full flex-col flex justify-center"
          >
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
          </div>
        </div>
      </a>
    {/each}
  </div>
{:else}
  <div class="flex items-center justify-center pt-4">
    <img src={screenPlaceholderImg} alt="2 people dancing" class="w-64 h-64" />
  </div>
{/if}
