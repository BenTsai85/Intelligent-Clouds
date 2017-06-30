# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import pymongo
import pymongo_spark

mongo_url = 'mongodb://spark_db:27017/'


class MovietimetablePipeline(object):
    def open_spider(self, spider):
        self.client = pymongo.MongoClient(mongo_url)
        self.db = self.client['movietimetable']

    def process_item( self, item, spider ):
        self.db['movie'].insert_one( item )
        return item
