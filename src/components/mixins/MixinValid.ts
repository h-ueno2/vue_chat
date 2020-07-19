import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MixinValid extends Vue {
  get refs(): any {
    return this.$refs as any;
  }

  private MailRules: any = [
    (v: any) => !!v || 'E-mailを入力してください',
    (v: any) => /.+@.+\..+/.test(v) || 'E-mailの形式ではありません',
  ];

  private passwordRules: any = [
    (v: any) => !!v || 'Passwordを入力してください',
  ];

  public validate(): boolean {
    return this.refs.form.validate();
  }
}
