export abstract class Utils{

    static getPercentage(currentValue:number, goal: number){
        const porcentaje: number = ( currentValue * 100) / goal;
        const [_, decimal] = String(porcentaje).split('.');
        return decimal ? porcentaje.toFixed(1) : porcentaje;
    }

}