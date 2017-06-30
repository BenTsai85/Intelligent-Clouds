# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class MovietimetableItem( scrapy.Item ):
    movie = scrapy.Field()
    theater = scrapy.Field()
    day = scrapy.Field()
    time = scrapy.Field()