import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MixinValid extends Vue {
  get refs(): any {
    return this.$refs as any;
  }

  public validate(): boolean {
    return this.refs.form.validate();
  }

  private requiredRules = (v: any) => !!v || '入力してください';
  private emailRules = (v: any) =>
    /.+@.+\..+/.test(v) || 'E-mailの形式ではありません'
}
