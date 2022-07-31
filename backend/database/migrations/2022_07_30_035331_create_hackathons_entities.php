<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function  up()
    {
        Schema::create('hackathons', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('place');
            $table->dateTime('date');
            $table->timestamps();
        });
        Schema::create('developments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('technology');
            $table->unsignedBigInteger('hackathon_id');
            $table->foreign('hackathon_id')->references('id')->on('hackathons');
            $table->timestamps();
        });
        Schema::create('developers', function (Blueprint $table) {
            $table->id();
            $table->string('user_name');
            $table->string('gender');
            $table->string('city');
            $table->string('phone');
            $table->string('picture');
            $table->unsignedBigInteger('hackathon_id');
            $table->unsignedBigInteger('development_id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('hackathon_id')->references('id')->on('hackathons');
            $table->foreign('development_id')->references('id')->on('developments');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
        Schema::create('winners', function (Blueprint $table) {
            $table->id();
            $table->integer('ranking');
            $table->unsignedBigInteger('developer_id')->nullable();
            $table->foreign('developer_id')->references('id')->on('developers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('winners');
        Schema::dropIfExists('developers');
        Schema::dropIfExists('developments');
        Schema::dropIfExists('hackathons');
    }
};
