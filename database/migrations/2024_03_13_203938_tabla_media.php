<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->foreignId('user_id')->constrained(
                table:'users',indexName: 'UserMedia'
            )->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('product_id')->constrained(
                table:'products',indexName: 'MediaProduct'
            )->onUpdate('cascade')->onDelete('cascade');
            $table->string('url');
            $table->integer('likes')->default(0);
            $table->string('description');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
