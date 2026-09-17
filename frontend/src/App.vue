<script setup>
import { ref, onMounted } from 'vue'

const jobs = ref([])

const company = ref('')
const title = ref('')
const status = ref('Applied')

// READ
async function loadJobs() {
  const response = await fetch('http://localhost:3000/api/jobs')
  jobs.value = await response.json()
}

// CREATE
async function addJob() {
  const response = await fetch('http://localhost:3000/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      company: company.value,
      title: title.value,
      status: status.value
    })
  })

  const newJob = await response.json()
  jobs.value.push(newJob)

  company.value = ''
  title.value = ''
  status.value = 'Applied'
}

// UPDATE
async function updateStatus(job) {
  const response = await fetch(`http://localhost:3000/api/jobs/${job.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: job.status
    })
  })

  await response.json()
}

// DELETE
async function deleteJob(id) {
  await fetch(`http://localhost:3000/api/jobs/${id}`, {
    method: 'DELETE'
  })

  jobs.value = jobs.value.filter(job => job.id !== id)
}

onMounted(loadJobs)
</script>

<template>
  <main>
    <h1>JobFlow</h1>
    <p>Job Application Tracker</p>

    <h2>Add Application</h2>

    <form @submit.prevent="addJob">
      <input
        v-model="company"
        placeholder="Company"
        required
      >

      <input
        v-model="title"
        placeholder="Job title"
        required
      >

      <select v-model="status">
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      <button type="submit">Add Job</button>
    </form>

    <h2>Applications</h2>

    <div v-for="job in jobs" :key="job.id">
      <h3>{{ job.title }}</h3>

      <p>{{ job.company }}</p>

      <select
        v-model="job.status"
        @change="updateStatus(job)"
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      <button @click="deleteJob(job.id)">
        Delete
      </button>
    </div>
  </main>
</template>