<template>test
  <ul>
    <li
      v-for="character of characters.data.characters.results"
      v-bind:key="character.items"
    >
      {{ character.name }}
    </li>
  </ul>
</template>

<script setup>
  const GET_CHARACTERS = `{
    characters {
      results {
        name
        id
      }
    }
  }`

  const { data: characters } = await useFetch(
    'https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_CHARACTERS
      })
    }
  )
</script>
