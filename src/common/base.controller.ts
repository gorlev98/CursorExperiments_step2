import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../modules/authentication/jwt-auth.guard';
import { CommonService } from './common.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Base')
@Controller()
export abstract class BaseController<T> {
  constructor(
    protected readonly service: any,
    protected readonly commonService: CommonService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all items with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'includes', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Return paginated items' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('includes') includes: string = '',
  ) {
    const { skip, take } = this.commonService.getPaginationParams(page, limit);
    const relations = this.commonService.getRelations(includes.split(',').filter(Boolean));
    
    const [items, total] = await this.service.findAll(skip, take, relations);
    return this.commonService.createPaginationResponse(items, total, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item by id' })
  @ApiResponse({ status: 200, description: 'Return item by id' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  async findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createDto: any) {
    return this.service.create(createDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update item by id' })
  @ApiResponse({ status: 200, description: 'Item updated successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(@Param('id') id: number, @Body() updateDto: any) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete item by id' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
} 