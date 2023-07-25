<script>
  /**
   * @type {boolean}
   */
  export let showModal;
  /**
   * @type {HTMLDialogElement}
   */
  let dialog;
  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  class="h-full rounded-md p-4"
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <!-- svelte-ignore a11y-autofocus -->
    <button autofocus on:click={() => dialog.close()} class="mb-10 md:mb-20"
      >close video</button
    >
    <!-- <slot name="header" /> -->
    <hr />
    <slot />
    <hr />
  </div>
</dialog>

<style>
  /* dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	} */
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    display: block;
    margin-top: 8px;
  }
</style>
