<span class="ndp-laravel-wrapper {{ $class }}">
    <input
        type="text"
        id="{{ $id }}"
        name="{{ $name }}"
        value="{{ $value }}"
        placeholder="{{ $placeholder }}"
        class="ndp-laravel-input"
        autocomplete="off"
        readonly
        {{ $required ? 'required' : '' }}
        {{ $attributes }}
    >
    @if($exportAd)
        <input type="hidden" id="{{ $exportAd }}" name="{{ $exportAd }}">
    @endif
</span>

@once
@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    if (typeof window.NepaliDatePicker === 'undefined') {
        console.warn('[NepaliDatePicker Laravel] Core JS not loaded. Add to your layout: <script src="{{ asset("vendor/nepali-datepicker/nepali-datepicker.js") }}"><\/script>');
        return;
    }
    new window.NepaliDatePicker('#{{ $id }}', {
        theme:       '{{ $theme }}',
        lang:        '{{ $lang }}',
        mode:        '{{ $mode }}',
        showAdDate:  {{ $showAdDate ? 'true' : 'false' }},
        @if($exportAd)exportAdInput: '#{{ $exportAd }}',@endif
    });
});
</script>
@endpush
@endonce
