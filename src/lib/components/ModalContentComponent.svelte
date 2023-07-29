<script lang="ts">
  import Youtube from "svelte-youtube-embed";
  import MapComponent from "./MapComponent.svelte";

  export let view = "video";
  export let vidId: string;
  let generated = false;
</script>

<div
  class="grid grid-cols-1 md:grid-cols-3 md:gap-2 gap-4 mt-14 w-full h-60 items-center justify-center md:mt-16 md:p-4 md:w-full md:h-40"
>
  <div
    class="w-72 h-40 md:w-40 md:h-80 rounded-md overflow-y-auto bg-slate-100"
  >
    {#if view === "video"}
      <div class="flex flex-row">
        <button
          on:click={() => (generated = !generated)}
          class="animate-bounce w-10 h-10 pb-2 md:w-8 md:h-8 z-20">🤖</button
        >
        <span class="text-xs font-normal text-slate-500 pt-2">Tap the bot</span>
      </div>
      <p class="text-sm text-center">Video aside</p>
      {#if generated}
        <p class="text-sm text-center">Generated AI info</p>
      {:else}
        <div class="animate-pulse flex space-x-4 m-2">
          <!-- <div class="rounded-full bg-slate-700 h-10 w-10" /> -->
          <div class="flex-1 space-y-3 py-1">
            <div class="h-2 bg-slate-600 rounded" />
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-2">
                <div class="h-2 bg-slate-600 rounded col-span-2" />
                <div class="h-2 bg-slate-600 rounded col-span-1" />
              </div>
              <div class="h-2 bg-slate-600 rounded" />
            </div>
          </div>
        </div>
      {/if}
    {:else}
      <p class="text-sm text-center mt-1">Video data:</p>
      <div class="flex flex-col mt-4">
        <span class="text-xs text-slate-600 text-center">Longitude: 3.7655</span
        >
        <span class="text-xs text-slate-600 text-center">Latitude: 6.7888</span>
        <span class="text-xs text-slate-600 text-center"
          >Video metadata extra</span
        >
        <span class="text-xs text-slate-600 text-center"
          >Video metadata plus</span
        >
      </div>
    {/if}
  </div>
  <div class="col-span-2 w-72 h-64 rounded-md md:w-full md:h-80 bg-slate-100">
    {#if view === "video"}
      <Youtube id={vidId} altThumb={true} />
    {:else}
      <MapComponent />
    {/if}
  </div>
</div>
