describe('No Generic', () => {
   class Data {
       value: any;
       
       constructor(value: any) {
           this.value = value;
       }
   }

    it('should accept all value', async () => {

        const data = new Data("Eko");

        console.info(data.value.toUpperCase())
    });
});