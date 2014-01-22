require 'rubygems'
require 'sinatra'
require 'json'
require 'rack-cache'
require 'net/http'
require 'net/https'
#require 'active_support/core_ext/hash'
#require 'active_support/core_ext/object'

use Rack::Cache
set :public_folder, 'public'
set :bind, '0.0.0.0'

get '/' do
  File.read(File.join('public', 'index.html'))
end

#===========

# GOV realtime visitors
get '/gov-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/government/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end

#===========

# Carers realtime visitors
get '/carers-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/carers-allowance/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end

#===========

# Licensing realtime visitors
get '/licensing-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/licensing/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end

#===========

# Legalise documents realtime visitors
get '/legalise-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/pay-legalisation-post/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end

#===========

# Legalise documents premium realtime visitors
get '/legalise-premium-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/pay-legalisation-drop-off/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end

#===========

# Married abroad realtime visitors
get '/married-abroad-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/pay-foreign-marriage-certificates/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end

#===========

# Birth abroad realtime visitors
get '/birth-abroad-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/pay-register-birth-abroad/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end

#===========

# Death abroad realtime visitors
get '/death-abroad-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/pay-register-death-abroad/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end

#===========

# tax disc realtime visitors
get '/tax-disc-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/tax-disc/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end

#===========

# SORN realtime visitors
get '/sorn-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/sorn/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end