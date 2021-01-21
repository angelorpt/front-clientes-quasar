<template>
  <q-page>
    <Container>
      <Titulo titulo="Clientes" subtitulo="Gerencie o cadastro de clientes" />

      <PesquisarNew icon="description"
                    :filtrar="filtrar"
                    :permissao="true"
                    to="/clientes/novo" />

      <Row class="q-mt-md">

        <Table  :columns="colunas"
                :data="lstClientes_filter" 
                :actions="botoesAcao"
                :loading="loading"
                @reload="loadDados"
                class="col-12" />
      </Row>    

    </Container>
  </q-page>
</template>

<script>

import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'PageClientesIndex',
  data() {
    return {
      colunas: [ 
        { label:"CPF"     , field: "cpf"      },
        { label:"Nome"    , field: "nome"     },
        { label:'E-mail'  , field: "email"    },
        { label:'Fone'    , field: "fone1"    },
        { label:'Sexo'    , field: "sexo"     },
        { label:'Idade'   , field: "idade"    },
        { label:'Ações'   , sort : false },
      ],

      botoesAcao  : [],
      lstClientes_filter : [],

    }
  },
  mounted() {
    this.gerarBotoesAcao();
    this.loadDados();
  },
  watch: {
    listaClienteToTable() {
      this.lstClientes_filter = this.listaClienteToTable;
    } 
  },
  computed: {
    ...mapState('Cliente', ['loading', 'lstClientes']),
    
    ...mapGetters('Cliente', ['listaClienteToTable']),
  },
  methods: {

    ...mapActions('Cliente', ['loadClientes']),

    gerarBotoesAcao() {
      this.botoesAcao = [
        { 
          icon         : 'remove_red_eye',
          to           : '/clientes/visualizar/{field}',
          fieldToRoute : 'id',
          tooltip      : 'Visualizar Cliente',
          permission   : true
        },
        { 
          icon         : 'edit',
          to           : '/clientes/editar/{field}',
          fieldToRoute : 'id',
          tooltip      : 'Editar Cliente',
          permission   : true
        },
        { 
          icon         : 'delete',
          deleteAPI    : '/clientes/{field}',
          fieldToRoute : 'id',
          tooltip      : 'Deletar Cliente',
          permission   : true
        },
      ];
    },
    
    filtrar(filtro) {
      let arrayKeys = ['cpf','nome','email','fone1','sexo','idade' ];
      this.lstClientes_filter = this.filterArray(this.listaClienteToTable, arrayKeys, filtro, 'id');
    },

    loadDados() {
      this.loadClientes();
    }

  }, // methods

}
</script>
