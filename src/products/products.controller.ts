import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(@Inject('PRODUCTS_SERVICE') private productClient: ClientProxy) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productClient.send('createProduct', createProductDto);
  }

  @Get()
  async findAll() {
    try {
      const products = await this.productClient
        .send('findAllProducts', {})
        .toPromise();
      console.log('This is products >>>', products);
      return { products };
    } catch (error) {
      console.error('Error occurred:', error);
      throw new InternalServerErrorException(
        'Error occurred while processing your request',
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productClient.send('findOneProduct', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productClient.send('updateProduct', { id, updateProductDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productClient.send('removeProduct', id);
  }
}
