<template>
  <div>
    <!-- Button to trigger the modal -->
    <button
      class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      @click="showModal = true"
    >
      Delete Project
    </button>
    <!-- Modal -->
    <div v-if="showModal" class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <div
        class="fixed inset-0 transition-opacity"
        @click="showModal = false"
      >
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        @click.stop
      >
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <svg class="h-6 w-6 text-blue-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              Delete Project
            </h3>
            <div class="mt-2">
              <p class="text-sm leading-5 text-gray-500">
                Please enter the name of the project you want to delete. This action cannot be undone.
              </p>
              <input class="form-input mt-1 block w-full py-2 px-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" v-model="projectName" type="text" placeholder="Project Name">
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <span class="flex w-full rounded-md shadow-sm">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              @click="deleteProject"
            >
            Confirm
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              @click="showModal = false"
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'

const showModal = ref(false);

function deleteProject() {
    showModal.value = false;

  }
</script>