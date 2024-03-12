describe('Generic', () => {

    class GenericData<T> {
        value: T;

        constructor(value: T) {
            this.value = value;
        }
    }

    it('should support multiple data value', async() => {
        const dataNumber = new GenericData<number>(123);
        expect(dataNumber.value).toBe(123);

        const dataString = new GenericData<string>("Iqbal");
        const upper = dataString.value.toUpperCase();
        expect(upper).toBe("IQBAL");
    });

    function create<T>(value: T): T {
        return value;
    }

    it('should support function generic', async() => {
        const result: string = create<string>("Eko");
        expect(result).toBe("Eko");

        const result2: number = create<number>(123);
        expect(result2).toBe(123);
    });

    class Entry<K, V> {
        constructor(public key: K, public value: V) {
        }
    }

    class Triple<K, V, T> {
        constructor(public first: K, public second: V, public third: T) {
        }
    }

    it('should support multiple generic', async () => {
        const entry = new Entry<number, string>(1, "Iqbal");
        expect(entry.key).toBe(1);
        expect(entry.value.toUpperCase()).toBe("IQBAL");

        const triple = new Triple<number, string, boolean>(1, "Iqbal", true);
        expect(triple.first).toBe(1);
        expect(triple.second).toBe("Iqbal");
        expect(triple.third).toBe(true);
    });

    it('should support optional generic type', async () => {
        const entry = new Entry(1, "Iqbal");
        expect(entry.key).toBe(1);
        expect(entry.value.toUpperCase()).toBe("IQBAL");

        const triple = new Triple(1, "Iqbal", true);
        expect(triple.first).toBe(1);
        expect(triple.second).toBe("Iqbal");
        expect(triple.third).toBe(true);
    });

    class SimpleGeneric<T = string> {
        private value?: T;

        setValue(value: T) {
            this.value = value;
        }

        getValue(): T | undefined {
            return this.value;
        }
    }

    it('should create simple generic', async () => {
        const simple = new SimpleGeneric();
        simple.setValue('Iqbal');
        expect(simple.getValue()!.toUpperCase()).toBe('IQBAL');
    });

    interface Employee {
        id: string;
        name: string;
    }

    interface Manager extends Employee {
        totalEmployee: number;
    }

    interface VicePresident extends Manager {
        totalManager: number;
    }

    class EmployeeData<T extends Employee> {
        constructor(public employee: T) {
        }
    }

    it('should support generic constraint', async () => {
       const data1 = new EmployeeData<Employee>({
           id: 'E01',
           name: 'Iqbal'
       });

       const data2 = new EmployeeData<Manager>({
           id: 'M01',
           name: 'Pamula',
           totalEmployee: 10
       });

       const data3 = new EmployeeData<VicePresident>({
           id: 'VP01',
           name: 'Eko',
           totalEmployee: 10,
           totalManager: 3
       });
    });

    it('should support array', async () => {
        const array = new Array<string>();
        array.push("Iqbal");
        array.push("Pamula");

        expect(array[0]).toBe("Iqbal");
        expect(array[1]).toBe("Pamula");
    });

    it('should support set', async () => {
        const set = new Set<string>();
        set.add("Iqbal");
        set.add("Pamula");
        set.add("Iqbal");

        expect(set.size).toBe(2);
        expect(set.has("Iqbal")).toBe(true);
        expect(set.has("Pamula")).toBe(true);
    });

    it('should support map', async () => {
        const map = new Map<string, number>();
        map.set("Iqbal", 100);
        map.set("Pamula", 88);

        expect(map.get("Iqbal")).toBe(100);
        expect(map.get("Pamula")).toBe(88);
    });

    async function fetchData(value: string): Promise<string>{
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                if(value === "Iqbal") {
                    resolve("Hello " + value);
                } else {
                    reject('Not Found');
                }
            }, 1000);
        });
    }

    it('should support promise', async () => {
        const result = await fetchData("Iqbal");
        expect(result.toUpperCase()).toBe("HELLO IQBAL");

        try {
            await fetchData('Pamula')
        } catch (e) {
            expect(e).toBe('Not Found');
        }
    });
});