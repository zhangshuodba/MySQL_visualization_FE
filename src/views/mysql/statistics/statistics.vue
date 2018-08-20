<template>
  <!-- <div>
    <Row>
      <Col span="12">
        <VmQPS></VmQPS>
        </Col>

      <Col span="12">
      <VmAudit></VmAudit>
      </Col>

      <Col span="12">
      <VmtableSpace></VmtableSpace>
      </Col>

      <Col span="12">
      <Vminnodbstatus></Vminnodbstatus>
      </Col>

    </Row>
    </div> -->


  <div>
    <Row>
      <Col span="12">
        <VmQPS></VmQPS>
        </Col>
      <Col span="12">
      <VmAudit></VmAudit>
      </Col>
    </Row>

<Row>
        <!-- <Col span="12">
      <VmtableSpace></VmtableSpace>
      </Col> -->
<!-- <br>
<br>
<br>
      <Col span="12">
      <Vminnodbstatus></Vminnodbstatus>
      </Col> -->
  </Row>


    </div>

</template>

<script>
import VmAudit from '@/views/mysql/components/vm-audit.vue'
import VmQPS from '@/views/mysql/components/vm-qps.vue'
import VmtableSpace from '@/views/mysql/components/vm-tablespace.vue'
import Vminnodbstatus from '@/views/mysql/components/vm-innodbstatus.vue'

export default {
  name: 'Dashboard',
  components: {
    VmAudit,
    VmQPS,
    VmtableSpace,
    Vminnodbstatus,
  },
  data () {
    return {
    }
  }
}
</script>
