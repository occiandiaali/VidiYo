<script lang="ts">
    import screenPlaceholderImg from '$lib/images/success.png';
	//import {YOUTUBE_API_KEY} from '$env/static/private';

	let TUBE_API_KEY = 'AIzaSyCSis_YjZDjyGgNvXSZPaYiZ-3oZ165SNo';
    let term = "";
	let selection = "";
	let result_sizes = [
		{id: 1, size: '25'},
		{id: 2, size: '15'},
		{id: 3, size: '10'},
		{id: 4, size: '5'}
	];
	let s = ['25', '15', '10', '5']
	let max_result = s[0];
	// let selected_size = '';
	// max_result = selected_size;
	let response;
	let data: any;

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
	<div
		class="py-5 md:py-2 flex flex-col justify-center items-center rounded-md"
	>
		<!-- <div class="capitalize font-bold text-5xl text-center">{term || 'YouTube API'}</div> -->
        <!-- svelte-ignore a11y-invalid-attribute -->
		{#if term}
		<div class="animate-bounce ml-16">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/> </svg>
		</div>
		{/if}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <h2 class="font-normal text-lg text-center flex-wrap">Search for <a href="#" style="pointer-events:{term.length > 3 ? 'all' : 'none'}" on:click={() => getData()} class="text-orange-700 text-lg md:text-2xl font-semibold pl-2 {term && 'absolute z-10 animate-pulse'}">{term || 'Unknown'}</a>
            {#if term} <span class="relative animate-ping opacity-80 inline-flex md:ml-10 rounded-full h-6 w-20 bg-orange-300"></span>{/if}
        </h2>
        <form class="flex items-center space-x-2 border-2 border-slate-200 rounded-full p-2 mt-4">
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
              placeholder="Search"
              bind:value={term}
            />
		</form>
		{#if data}
		<div>
			<p class="text-slate-400 text-sm mt-2">Showing {max_result} results for <span class="font-semibold text-lg">{selection}</span>.</p>
		</div>
		{/if}
		{#if term && !data}
		<div class="p-4">
			<span class="text-sm text-slate-600">Show{" "} 
				<select class="ml-2 mr-2" bind:value={max_result} on:change={() => console.log(max_result)}>
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

{#if data}
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-4">
		{#each data.items as item}
			<a
				href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
				target="_blank"
				rel="noreferrer"
			>
				<div class="w-full h-80 transition-all group duration-200 rounded-lg">
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
        <img src={screenPlaceholderImg} alt="2 people dancing" class="w-64 h-64"/>
    </div>
{/if}