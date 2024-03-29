import { Component, EventEmitter,Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MessageService } from "primeng/api";
import { error } from 'node:console';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit,OnChanges{

   @Input() displayAddEditModal: boolean=true;
   @Input() selectedProduct: any = null;
   @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Output() clickAddEdit: EventEmitter<any>=new EventEmitter<any>();
   modalType="Add";

   productForm=this.fb.group({
      pr_id:[0,Validators.required],
      pr_name:["",Validators.required],
      Cat_id:[0,Validators.required],
      Cat_name:["",Validators.required],

   })
   constructor(private fb: FormBuilder,private productService:ProductService,
    private messageService:MessageService) { }

   ngOnInit(): void{

   }

   ngOnChanges(): void {
       if(this.selectedProduct){
        this.modalType='Edit';
        this.productForm.patchValue(this.selectedProduct)
       } else{
        this.productForm.reset();
        this.modalType='Add';
       }
   }

   closeModal(){
    this.productForm.reset();
     this.clickClose.emit(true);
   }

   addEditProduct(){
  this.productService.addEditProduct(this.productForm.value,this.selectedProduct).subscribe(
  response => {
    this.clickAddEdit.emit(response);
    this.closeModal();
    const msg=this.modalType === 'Add ' ? 'Product added' : 'Product Updated'
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg  });
   
  },
 () =>{
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added'  });
  console.log('Added Successfully');
 }
   ) 
  }
}
