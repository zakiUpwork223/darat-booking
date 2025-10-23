import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('general')
  async search(@Query() queryDto: SearchDto) {
    const { query } = queryDto;
    const results = await this.searchService.search(query);
    return results;
  }
  // @Post()
  // create(@Body() createSearchDto: SearchDto) {
  //   return this.searchService.create(createSearchDto);
  // }

  // @Get()
  // findAll() {
  //   return this.searchService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.searchService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSearchDto: UpdateSearchDto) {
  //   return this.searchService.update(+id, updateSearchDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.searchService.remove(+id);
  //}
}
