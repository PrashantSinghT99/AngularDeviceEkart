import { Accessory } from "../shared-resources/accessory.model";

export class Device
{
public name:string;
public description: string;
public imagePath:string
public accessories:Accessory[];

constructor(name:string,description:string,imagePath:string,accessories:Accessory[])
{
    this.name=name;
    this.description=description;
    this.imagePath=imagePath;
    this.accessories=accessories;
}
}