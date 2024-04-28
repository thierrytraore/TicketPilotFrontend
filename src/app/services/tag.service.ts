import { Injectable } from '@angular/core';
import { BaseService } from "./base.service";
import { TagModel } from "../models/tag.model";

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseService<TagModel> {
  constructor() {
    super('tags');
  }
}
