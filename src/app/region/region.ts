export class Iregion {
    committee: any[];
    id:Guid;
    nameAr: string='';
    nameEn: string='';
   rentSupportRequest:any[];
}


export class IregionVM {
   items : Iregion[]
   total = 0;
   page = 1;
   limit = 20;
}




