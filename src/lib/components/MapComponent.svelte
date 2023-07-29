<script lang="ts">
  import { onMount } from "svelte";

  let map;
  let mapElement: HTMLDivElement;
  let zoom = 8;
  let longitude = 3.2548;
  let latitude = 6.7633;
  let t;

  onMount(async () => {
    t = await import("@tomtom-international/web-sdk-maps");
    map = t.map({
      key: "7Ki7uhB3GnitHJCmnCWMiRDAGevgOPOT",
      container: mapElement,
      stylesVisibility: {
        trafficFlow: true,
      },
      center: [longitude, latitude],
      zoom: zoom,
    });
    map.addControl(new t.FullscreenControl());
    map.addControl(new t.NavigationControl());
  });
</script>

<main>
  <div class="map md:w-96 md:h-80 h-64 w-full" bind:this={mapElement} />
</main>
