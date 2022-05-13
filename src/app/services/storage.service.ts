import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage | null = null;

  constructor(
    private storageService: Storage
  ) { 
    this.initStorage();
  }

  async initStorage():Promise<boolean>{
    try{
      this.storage = this.storage || await this.storageService.create();
      return true;
    }catch(e){
      console.error('storage error', e);
      return false;
    }
  }

  async set(item: string, value: any): Promise<boolean>{
    try{
      await this.initStorage();
      await this.storage?.set(item, value);
      return true;
    }catch(e){
      console.error(e);
      return false;
    }
  }

  async get(item: string): Promise<any>{
    await this.initStorage();
    return await this.storage.get(item);
  }

  async delete(item: string): Promise<boolean>{
    try{
      await this.initStorage();
      await this.storage.remove(item);
      return true;
    }catch(e){
      console.error(e);
      return false;
    }
  }

  async clearAll(){
    try{
      await Promise.all([this.initStorage(), this.storage.clear()]);
      return true;
    }catch(e){
      console.error(e);
      return false;
    }
  }
}
