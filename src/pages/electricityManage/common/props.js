import { ElectricityManageDic } from "@/utils/dictionary";
const { status } = ElectricityManageDic;

export default function () {
  return {
    computed: {
      userInfo() {
        return this.$store.getters.userInfo
      }
    },
    methods: {
      hasCheck(val) {
        return status[0].value === val || status[3].value === val;
      },
      hasRejected(val) {
        return status[2].value === val;
      },
      isCurrentUser(operatorId) {
        return this.userInfo.id === operatorId;
      }
    }
  }
}