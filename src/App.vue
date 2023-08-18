<script setup>
import { CfAppLayout, CfAppBarLink, CfDropdownItem, CfSidebarLink, CfAppView } from './components/index.js'
</script>

<template>
  <CfAppLayout>
    <template #brand>
      <b>Vue CF UI</b>
    </template>
    <template #navigation>
      <CfAppBarLink dropdown>
        <template #default>
          Paolo Uy
        </template>
        <template #dropdown>
          <CfDropdownItem large>Manage Account</CfDropdownItem>
          <CfDropdownItem large>Log Out</CfDropdownItem>
        </template>
      </CfAppBarLink>
    </template>
    <template #sidebar>
      <CfSidebarLink href="#" icon="smart_toy" class="router-link-active">Playground</CfSidebarLink>
      <CfSidebarLink href="https://github.com/paouy/vue-cf-ui" icon="code">Repository</CfSidebarLink>
    </template>
    <template #main>
      <CfAppView>
        Hello
      </CfAppView>
    </template>
  </CfAppLayout>
</template>