<template>
  <EmployeeHeader />
  <DataTable :value="informations" paginator :rows="12" :rowsPerPageOptions="[10, 20]" class="!py-0 !px-0">
    <Column header="Employee Name" class="!py-2 !px-6" sortable="">
      <template #body="slotProps">
          <div class="text-white">{{ slotProps.data.employee_name }}</div>
          <div class="text-gray-500 text-sm">{{ slotProps.data.employee_company_name }}</div>
          <div class="text-gray-500 text-sm">@{{ slotProps.data.employee_id }}</div>
      </template>
    </Column>
    <Column header="Date" class="!py-2">
      <template #body="slotProps">
        <div class="text-white">{{ slotProps.data.shift_in_day }}</div>
        <div class="text-gray-500 text-sm">{{ slotProps.data.shift_in_month }}</div>
      </template>
    </Column>
    <Column header="Roaster" class="!py-2">
      <template #body="slotProps">
        <div class="flex items-center gap-2">
          <div class="text-sm">
            <div class="text-white">{{ slotProps.data.shift_in }}</div>
            <div class="text-white">{{ slotProps.data.shift_out }}</div>
          </div>
          <div class="bg-gray-500 text-white px-3 py-2 rounded">{{ slotProps.data.shift_in_time }}</div>
        </div>
      </template>
    </Column>
    <Column header="Attendance" class="!py-2">
      <template #body="slotProps">
        <div class="flex items-center gap-2">
          <div class="text-sm">
            <div class="text-white">{{ slotProps.data.attendance_checkin }}</div>
            <div class="text-white">{{ slotProps.data.attendance_checkout }}</div>
          </div>
          <div class="bg-gray-500 text-white px-3 py-2 rounded">{{ slotProps.data.shift_in_time }}</div>
          <div class="bg-gray-500 text-white px-3 py-2 rounded">{{ slotProps.data.shift_out_time }}</div>
        </div>
      </template>
    </Column>
    <Column header="Status" class="!py-2">
      <template #body="slotProps">
        <div
          :class="slotProps.data.attendance_status_in === 'LATE' ? 'bg-yellow-200 rounded text-center' : 'bg-gray-400 rounded text-center'">
          {{ slotProps.data.attendance_status_in }}
        </div>
        <div
          :class="slotProps.data.attendance_status_out === 'LATE' ? 'bg-yellow-200 rounded px-4 mt-1 text-center' : 'bg-gray-400  rounded mt-1 text-center '">
          {{ slotProps.data.attendance_status_out }}</div>
      </template>
    </Column>

  </DataTable>

</template>
<script setup>


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import EmployeeHeader from '@/components/layout/EmployeeComponents/employeeHeader.vue';

const informations = [
  {
    "attendance_checkin": "2025-11-19 22:57:06",
    "attendance_checkin_unix": 1763593026000,
    "attendance_checkout": "2025-11-20 07:01:03",
    "attendance_checkout_unix": 1763622063000,
    "attendance_id": 95754,
    "attendance_link_id": 0,
    "attendance_logs": [],
    "attendance_status_in": "ONTIME",
    "attendance_status_out": "ONTIME",
    "employee_company_id": 1,
    "employee_company_name": "ORiON\u2122",
    "employee_id": 665,
    "employee_name": "Baseer Mehtab Shakir",
    "over_below_status": false,
    "roster_id": 56287,
    "shift_in": "2025-11-19 23:00:00",
    "shift_in_day": "Wednesday",
    "shift_in_month": "November ",
    "shift_in_time": "23:00:00",
    "shift_in_unix": 1763593200000,
    "shift_out": "2025-11-20 07:00:00",
    "shift_out_time": "07:00:00",
    "shift_out_unix": 1763622000000,
    "shift_type": "SHIFT"
  },
  {
    "attendance_checkin": "2025-11-19 22:55:49",
    "attendance_checkin_unix": 1763592949000,
    "attendance_checkout": "2025-11-20 09:06:36",
    "attendance_checkout_unix": 1763629596000,
    "attendance_id": 95753,
    "attendance_link_id": 0,
    "attendance_logs": [],
    "attendance_status_in": "ONTIME",
    "attendance_status_out": "ONTIME",
    "employee_company_id": 24,
    "employee_company_name": "Lynx Taxis",
    "employee_id": 645,
    "employee_name": "Qasim Bashir",
    "over_below_status": false,
    "roster_id": 55078,
    "shift_in": "2025-11-19 23:00:00",
    "shift_in_day": "Wednesday",
    "shift_in_month": "November ",
    "shift_in_time": "23:00:00",
    "shift_in_unix": 1763593200000,
    "shift_out": "2025-11-20 09:00:00",
    "shift_out_time": "09:00:00",
    "shift_out_unix": 1763629200000,
    "shift_type": "SHIFT"
  },
  {
    "attendance_checkin": "2025-11-19 21:59:59",
    "attendance_checkin_unix": 1763589599000,
    "attendance_checkout": "2025-11-20 06:03:14",
    "attendance_checkout_unix": 1763618594000,
    "attendance_id": 95751,
    "attendance_link_id": 0,
    "attendance_logs": [
      {
        "message": "Muneeb covered his lateness of 16 min.",
        "priority": "MEDIUM",
        "user": "horizon@theorion.pk"
      }
    ],
    "attendance_status_in": "ONTIME",
    "attendance_status_out": "ONTIME",
    "employee_company_id": 7,
    "employee_company_name": "Lynk Taxis",
    "employee_id": 186,
    "employee_name": "Usama Abbas",
    "over_below_status": false,
    "roster_id": 56275,
    "shift_in": "2025-11-19 22:00:00",
    "shift_in_day": "Wednesday",
    "shift_in_month": "November ",
    "shift_in_time": "22:00:00",
    "shift_in_unix": 1763589600000,
    "shift_out": "2025-11-20 06:00:00",
    "shift_out_time": "06:00:00",
    "shift_out_unix": 1763618400000,
    "shift_type": "SHIFT"
  },
  {
    "attendance_checkin": "2025-11-19 21:51:48",
    "attendance_checkin_unix": 1763589108000,
    "attendance_checkout": "2025-11-20 08:02:15",
    "attendance_checkout_unix": 1763625735000,
    "attendance_id": 95745,
    "attendance_link_id": 0,
    "attendance_logs": [],
    "attendance_status_in": "ONTIME",
    "attendance_status_out": "ONTIME",
    "employee_company_id": 2331,
    "employee_company_name": "Allens Taxis",
    "employee_id": 692,
    "employee_name": "Haseeb Babar",
    "over_below_status": false,
    "roster_id": 56097,
    "shift_in": "2025-11-19 22:00:00",
    "shift_in_day": "Wednesday",
    "shift_in_month": "November ",
    "shift_in_time": "22:00:00",
    "shift_in_unix": 1763589600000,
    "shift_out": "2025-11-20 08:00:00",
    "shift_out_time": "08:00:00",
    "shift_out_unix": 1763625600000,
    "shift_type": "SHIFT"
  },
  {
    "attendance_checkin": "2025-11-19 20:00:00",
    "attendance_checkin_unix": 1763582400000,
    "attendance_checkout": "2025-11-20 01:20:45",
    "attendance_checkout_unix": 1763601645000,
    "attendance_id": 95742,
    "attendance_link_id": 0,
    "attendance_logs": [],
    "attendance_status_in": "LATE",
    "attendance_status_out": "ONTIME",
    "employee_company_id": 1,
    "employee_company_name": "ORiON\u2122",
    "employee_id": 441,
    "employee_name": "Jan Muhammad Butt",
    "over_below_status": false,
    "roster_id": 56431,
    "shift_in": "2025-11-19 20:00:00",
    "shift_in_day": "Wednesday",
    "shift_in_month": "November ",
    "shift_in_time": "20:00:00",
    "shift_in_unix": 1763582400000,
    "shift_out": "2025-11-20 01:00:00",
    "shift_out_time": "01:00:00",
    "shift_out_unix": 1763600400000,
    "shift_type": "SHIFT"
  },
  {
    "attendance_checkin": "2025-11-19 19:59:30",
    "attendance_checkin_unix": 1763582370000,
    "attendance_checkout": "2025-11-20 06:07:33",
    "attendance_checkout_unix": 1763618853000,
    "attendance_id": 95735,
    "attendance_link_id": 0,
    "attendance_logs": [],
    "attendance_status_in": "ONTIME",
    "attendance_status_out": "ONTIME",
    "employee_company_id": 19,
    "employee_company_name": "247 Radio Cars",
    "employee_id": 543,
    "employee_name": "Danyal Ahmed",
    "over_below_status": false,
    "roster_id": 54900,
    "shift_in": "2025-11-19 20:00:00",
    "shift_in_day": "Wednesday",
    "shift_in_month": "November ",
    "shift_in_time": "20:00:00",
    "shift_in_unix": 1763582400000,
    "shift_out": "2025-11-20 06:00:00",
    "shift_out_time": "06:00:00",
    "shift_out_unix": 1763618400000,
    "shift_type": "SHIFT"
  },
  {
    "attendance_checkin": "2025-11-19 19:56:37",
    "attendance_checkin_unix": 1763582197000,
    "attendance_checkout": "2025-11-20 06:02:04",
    "attendance_checkout_unix": 1763618524000,
    "attendance_id": 95734,
    "attendance_link_id": 0,
    "attendance_logs": [],
    "attendance_status_in": "ONTIME",
    "attendance_status_out": "ONTIME",
    "employee_company_id": 1602,
    "employee_company_name": "One Call Ltd (SRC Taxis)",
    "employee_id": 542,
    "employee_name": "M. Awais",
    "over_below_status": false,
    "roster_id": 54171,
    "shift_in": "2025-11-19 20:00:00",
    "shift_in_day": "Wednesday",
    "shift_in_month": "November ",
    "shift_in_time": "20:00:00",
    "shift_in_unix": 1763582400000,
    "shift_out": "2025-11-20 06:00:00",
    "shift_out_time": "06:00:00",
    "shift_out_unix": 1763618400000,
    "shift_type": "SHIFT"
  },
  {
    "attendance_checkin": "2025-11-19 19:56:27",
    "attendance_checkin_unix": 1763582187000,
    "attendance_checkout": "2025-11-20 06:00:36",
    "attendance_checkout_unix": 1763618436000,
    "attendance_id": 95737,
    "attendance_link_id": 0,
    "attendance_logs": [],
    "attendance_status_in": "ONTIME",
    "attendance_status_out": "ONTIME",
    "employee_company_id": 2712,
    "employee_company_name": "Ashton Allied Taxis",
    "employee_id": 626,
    "employee_name": "Abdullah Khalid",
    "over_below_status": false,
    "roster_id": 53895,
    "shift_in": "2025-11-19 20:00:00",
    "shift_in_day": "Wednesday",
    "shift_in_month": "November ",
    "shift_in_time": "20:00:00",
    "shift_in_unix": 1763582400000,
    "shift_out": "2025-11-20 06:00:00",
    "shift_out_time": "06:00:00",
    "shift_out_unix": 1763618400000,
    "shift_type": "SHIFT"
  },
  {
    "attendance_checkin": "2025-11-19 19:46:21",
    "attendance_checkin_unix": 1763581581000,
    "attendance_checkout": "2025-11-20 06:09:01",
    "attendance_checkout_unix": 1763618941000,
    "attendance_id": 95733,
    "attendance_link_id": 0,
    "attendance_logs": [],
    "attendance_status_in": "ONTIME",
    "attendance_status_out": "ONTIME",
    "employee_company_id": 2720,
    "employee_company_name": "Taxy",
    "employee_id": 619,
    "employee_name": "Muhammad Faraz Iqbal",
    "over_below_status": false,
    "roster_id": 53352,
    "shift_in": "2025-11-19 20:00:00",
    "shift_in_day": "Wednesday",
    "shift_in_month": "November ",
    "shift_in_time": "20:00:00",
    "shift_in_unix": 1763582400000,
    "shift_out": "2025-11-20 06:00:00",
    "shift_out_time": "06:00:00",
    "shift_out_unix": 1763618400000,
    "shift_type": "SHIFT"
  },
  {
    "attendance_checkin": "2025-11-19 18:56:49",
    "attendance_checkin_unix": 1763578609000,
    "attendance_checkout": "2025-11-20 04:00:45",
    "attendance_checkout_unix": 1763611245000,
    "attendance_id": 95729,
    "attendance_link_id": 0,
    "attendance_logs": [],
    "attendance_status_in": "ONTIME",
    "attendance_status_out": "ONTIME",
    "employee_company_id": 31,
    "employee_company_name": "Go Cars",
    "employee_id": 659,
    "employee_name": "Hamayun Zaheer",
    "over_below_status": false,
    "roster_id": 56179,
    "shift_in": "2025-11-19 19:00:00",
    "shift_in_day": "Wednesday",
    "shift_in_month": "November ",
    "shift_in_time": "19:00:00",
    "shift_in_unix": 1763578800000,
    "shift_out": "2025-11-20 04:00:00",
    "shift_out_time": "04:00:00",
    "shift_out_unix": 1763611200000,
    "shift_type": "SHIFT"
  },
  {
    "attendance_checkin": "2025-11-19 18:43:55",
    "attendance_checkin_unix": 1763577835000,
    "attendance_checkout": "2025-11-20 05:29:59",
    "attendance_checkout_unix": 1763616599000,
    "attendance_id": 95728,
    "attendance_link_id": 0,
    "attendance_logs": [],
    "attendance_status_in": "ONTIME",
    "attendance_status_out": "ONTIME",
    "employee_company_id": 1,
    "employee_company_name": "ORiON\u2122",
    "employee_id": 485,
    "employee_name": "Adeel Munir",
    "over_below_status": false,
    "roster_id": 56326,
    "shift_in": "2025-11-19 19:00:00",
    "shift_in_day": "Wednesday",
    "shift_in_month": "November ",
    "shift_in_time": "19:00:00",
    "shift_in_unix": 1763578800000,
    "shift_out": "2025-11-20 05:00:00",
    "shift_out_time": "05:00:00",
    "shift_out_unix": 1763614800000,
    "shift_type": "SHIFT"
  },
  {
    "attendance_checkin": "2025-11-19 18:39:28",
    "attendance_checkin_unix": 1763577568000,
    "attendance_checkout": "2025-11-20 04:01:08",
    "attendance_checkout_unix": 1763611268000,
    "attendance_id": 95727,
    "attendance_link_id": 0,
    "attendance_logs": [],
    "attendance_status_in": "LATE",
    "attendance_status_out": "ONTIME",
    "employee_company_id": 1997,
    "employee_company_name": "All The Fours",
    "employee_id": 539,
    "employee_name": "Muhammad Faisal",
    "over_below_status": false,
    "roster_id": 55201,
    "shift_in": "2025-11-19 18:00:00",
    "shift_in_day": "Wednesday",
    "shift_in_month": "November ",
    "shift_in_time": "18:00:00",
    "shift_in_unix": 1763575200000,
    "shift_out": "2025-11-20 04:00:00",
    "shift_out_time": "04:00:00",
    "shift_out_unix": 1763611200000,
    "shift_type": "SHIFT"
  }
]
</script>
